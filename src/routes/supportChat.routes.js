import config from '../config'
import { Router } from "express";
import { putUser } from '../controllers/users.controller';
const axios = require('axios')

const router = Router()
const url = 'https://2409320f88cd9975.api-eu.cometchat.io/v3';

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    appId: config.appID,
    apiKey: config.apiKey,
};
const generateUID = () => {
    const allowedCharacters = 'abcdefghijklmnopqrstuvwxyz0123456789-_';
    const uidLength = 100;
    let uid = '';
  
    for (let i = 0; i < uidLength; i++) {
      const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
      uid += allowedCharacters[randomIndex];
    }
  
    return uid;
  };
  
router.get('/api/create',async  (req, res) => {
    const userId = req.query.userId
    const data = {
        uid: generateUID(),
        name: req.query.username,
    };
    await putUser({ params: { id: userId }, body: { uid: data.uid, nameSurename: req.query.nameSurename, jmbg: req.query.jmbg,phoneNumber: req.query.phoneNumber,username: req.query.username, } }, res);

    axios
        .post(`${url}/users`, JSON.stringify(data), {
            headers,
        })
        .then(response => {
            requestAuthToken(response.data.data.uid)
                .then(token => {
                    console.log('Success:' + JSON.stringify(token));
                    res.json(token);
                })
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
});

router.get('/api/auth', (req, res) => {
    const uid = req.query.uid;
    requestAuthToken(uid)
        .then(token => {
            console.log('Success:' + JSON.stringify(token));
            res.json(token);
        })
        .catch(error => console.error('Error:', error));
});

const requestAuthToken = uid => {
    return new Promise((resolve, reject) => {
        axios
            .post(`${url}/users/${uid}/auth_tokens`, null, {
                headers,
            })
            .then(response => {
                console.log('New Auth Token:', response.data);
                resolve(response.data.data);
            })
            .catch(error => reject(error));
    });
};

router.get('/api/users', (req, res) => {
    axios
        .get(`${url}/users`, {
            headers,
        })
        .then(response => {
           
            const { data } = response.data;
            const filterAgentData = data.filter(data => {
                return data.uid !== config.agentUID;
            });
            res.json(filterAgentData);
        })
        .catch(error => console.error('Error:', error));
});

export default router

