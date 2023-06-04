import React, { useEffect, useState } from "react";
import Header from '../Header/Header'
import Footer from '../Footer/Footer';
import { getAllCars } from '../../redux/actions/carsAction'
import Skeleton from 'react-loading-skeleton'
import '../Cars/Cars.css'

const Cars = () => {

  const [data, setData] = useState([])
  const [filter, setFilter] = useState(data)
  const [loading, setLoading] = useState(false)
  const [searchField, setSearchField] = useState("");
  const [selectedType, setSelectedType] = useState("")

  let componentMounted = true

  useEffect(() => {
    const getCars = async () => {
      setLoading(true)
      const response = await fetch("http://localhost:4000/vehicles")
      if (componentMounted) {
        setData(await response.clone().json())
        setFilter(await response.json())
        setLoading(false)
      }
    }

    getCars()
  }, [])

  const Loading = () => {
    return (
      <>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
        <div className="col-md-3">
          <Skeleton height={350} />
        </div>
      </>
    )
  }

  const filterCars = (type) => {
    if (type === "") {
      setFilter(data);
    } else {
      const updatedList = data.filter((x) => x.type === type);
      setFilter(updatedList);
    }
    setSelectedType(type);
  }

  const handleChange = (event) => {
    const query = event.target.value;
    const updatedList = data.filter((item) => item.name.toLowerCase().includes(query.toLowerCase()))
    setSearchField(query)
    setFilter(updatedList);
  };


  const ShowCars = () => {
    return (
      <>
        <div className="d-flex mb-5 pb-5 local-bootstrap">
          <div className="select-container">
            <select
              className="form-select bg-warning me-4"
              value={selectedType}
              onChange={(e) => filterCars(e.target.value)}
            >
              <option value="">Sva vozila</option>
              <option value="Automobil">Automobili</option>
              <option value="Kamion">Kamioni</option>
              <option value="Motor">Motori</option>
              <option value="Skuter">Skuteri</option>
              <option value="Kamion sa prikolicom">Kamioni sa prikolicama</option>
            </select>
          </div>

          <div id="search-header">
            <div id="search-text">Pretraga:</div>
            <input
              autoFocus="autoFocus"
              value={searchField}
              placeholder="Pretraži vozila koja posedujemo"
              onChange={handleChange}
            />
          </div>
        </div>

        {filter.map((car) => {
          return (
            <>
              <div className="col-md-4 mb-4">
                <div class="card h-100 text-center p-1" key={car.vehicleId}>
                  <img src={car.carImage} class="card-img-top" alt={car.vin} height="150px" />
                  <div class="card-body">
                    <p className="info">
                      <b>Ccm:</b> {car.ccm}
                    </p>
                    <p className="info">
                      <b>Vin:</b> {car.vin}
                    </p>
                    <p className="info">
                      <b>Godiste:</b> {car.yearOfProduction}
                    </p>
                    <p className="info">
                      <b>Opis:</b> {car.description}
                    </p>
                  </div>
                  <div>
                    <h5 style={{ width: "400px" }}>{car.name}</h5>
                    <h1 class=" text-center lead fw-bold">
                      Tip: {car.type.substring(0, 12)}
                    </h1>
                  </div>
                </div>
              </div>
            </>
          )
        })}
      </>
    )
  }

  return (
    <div>
      <Header />
      <div className="container my-3 py-3">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="text-center"> <span className="stroke-text display-6 fw-bolder" style={{ color: 'var(--darkGrey)' }}>Vozni</span><span className="display-6 fw-bolder text-light"> park </span></h1>
            <hr />
            <p className="car-text">Naš vozni park sastoji se od raznolikog skupa vozila koji zadovoljavaju naše potrebe i zahtjeve.
              Imamo široku paletu vozila uključujući osobna vozila, kombije, kamione i motocikle. Svako vozilo je pažljivo odabrano kako bi osiguralo pouzdanost, udobnost i sigurnost naših korisnika.
              <br />
              Naš vozni park redovito se održava kako bi vozila bila u najboljem stanju i spremna za upotrebu.
              Pridržavamo se strogih sigurnosnih standarda i provodimo redovite provjere tehničke ispravnosti. Naša vozila su opremljena suvremenim tehnologijama i
              dodatnom opremom koja poboljšava performanse i udobnost vožnje. Dostupnost vozila za zaposlene ili korisnike može varirati u zavisnosti od organizacije i njenih politika upravljanja vozilima. Evo nekoliko uobičajenih scenarija:
              <br />
              <br />
              <b>   1. </b>    Vozni park za zaposlene: U nekim firmama ili organizacijama postoji poseban vozni park namenjen isključivo zaposlenima. U takvim slučajevima, zaposleni mogu imati pristup vozilima za službene ili privatne svrhe, u skladu sa politikom kompanije. Ta vozila mogu biti u vlasništvu kompanije ili se mogu iznajmljivati od trećih lica.
              <br />
              <br />
              <b>   2. </b>    Deljenje vozila ili iznajmljivanje: Organizacije mogu uspostaviti dogovor sa kompanijama za deljenje vozila ili iznajmljivanje kako bi omogućile svojim zaposlenima ili korisnicima pristup vozilima po potrebi. Ovo se često koristi u gradskim područjima gde je posedovanje sopstvenog vozila nepraktično ili skupo.
              <br />
              <br />
              <b>   3. </b>     Deljenje vozila unutar organizacije: U nekim slučajevima, organizacije mogu koristiti model deljenja vozila unutar sopstvenog voznog parka. To znači da više zaposlenih ili korisnika deli isto vozilo u različitim vremenskim periodima. Ovo može biti efikasan način optimizacije korišćenja vozila i smanjenja troškova.
              <br />
              <br />
              <b>   4. </b>     Dostupnost vozila za zaposlene ili korisnike može biti regulisana određenim pravilima, kao što su potrebna vozačka dozvola, starosna ograničenja ili druge uslove koje je postavila organizacija. Ove politike obično uključuju i sistem rezervacija vozila kako bi se osiguralo da su vozila dostupna kada su potrebna.</p>

          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowCars />}
        </div>
      </div>
      <Footer />
    </div>
  )
}


export default Cars
