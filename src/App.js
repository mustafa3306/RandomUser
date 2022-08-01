import React, { useEffect, useState } from "react";
import mailSvg from "./assets/mail.svg";
import manSvg from "./assets/man.svg";
import womanSvg from "./assets/woman.svg";
import manAgeSvg from "./assets/growing-up-man.svg";
import womanAgeSvg from "./assets/growing-up-woman.svg";
import mapSvg from "./assets/map.svg";
import phoneSvg from "./assets/phone.svg";
import padlockSvg from "./assets/padlock.svg";
import cwSvg from "./assets/cw.svg";
import Footer from "./components/footer/Footer";
import axios from "axios";

const url = "https://randomuser.me/api/";

function App() {
  const [person, setPerson] = useState([]);
  const [info, setInfo] = useState('');
  const [show, setShow] = useState(false);
  const [my, setMy] = useState('name');
  const [table, setTable] = useState([]);
  const [pageLoad, setPageLoad] = useState(true)

  const setInfoMy = (inf, text) => {
    setInfo(inf);
    setMy(text)
  }
  const getPerson = async () => {
    try {
      if (person) {
        setPageLoad(false);
      }
      const { data } = await axios.get(url);
      setPerson(data.results);
      setInfo(data.results[0].name.first)
      setPageLoad(true);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(info);
  const addUser = () => {
    setShow(true);
    const check = table.filter((item) => item.email === person[0].email);
    check.length
      ? alert("This person is on the list")
      : setTable([...table, person[0]]);
  };

  useEffect(() => {
    getPerson()
  }, [])

  return (
    <main>
      <div className="block bcg-orange">
        <img src={cwSvg} alt="cw" id="cw" />
      </div>
      <div className="block">
        <div className="container" >
          {person?.map((item, index) => (
            <div key={index}>
              <div>
                <img src={item.picture.medium} alt="random user" className="user-img" />
                <p className="user-title">My {my} is</p>
                <p className="user-value" >{info}</p>
              </div>
              <div className="values-list">
                <button className="icon" data-label="name" onClick={(e) => setInfoMy(item.name.first, 'name')}>
                  <img src={item.gender === 'male' ? manSvg : womanSvg} alt="user" id="iconImg" />
                </button>
                <button className="icon" data-label="email" onClick={(e) => setInfoMy(item.email, 'email')}>
                  <img src={mailSvg} alt="mail" id="iconImg" />
                </button>
                <button className="icon" data-label="age" onClick={() => setInfoMy(item.dob.age, 'age')}>
                  <img src={item.gender === 'male' ? manAgeSvg : womanAgeSvg} alt="age" id="iconImg" />
                </button>
                <button className="icon" data-label="street" onClick={() => setInfoMy(item.location.country, 'country')}>
                  <img src={mapSvg} alt="map" id="iconImg" />
                </button>
                <button className="icon" data-label="phone" onClick={() => setInfoMy(item.phone, 'phone')}>
                  <img src={phoneSvg} alt="phone" id="iconImg" />
                </button>
                <button className="icon" data-label="password" onClick={() => setInfoMy(item.login.password, 'secret password')}>
                  <img src={padlockSvg} alt="lock" id="iconImg" />
                </button>
              </div>
            </div>
          ))}
          <div className="btn-group">
            <button className="btn" type="button" onClick={() => getPerson()} >
              {pageLoad ? 'new user' : 'Loading...'}
            </button>
            <button className="btn" type="button" onClick={addUser}>
              add user
            </button>
          </div>
          {show &&
            <table className="table">
              <thead>
                <tr className="head-tr">
                  <th className="th">Firstname</th>
                  <th className="th">Email</th>
                  <th className="th">Phone</th>
                  <th className="th">Age</th>
                </tr>
              </thead>
              <tbody>
                {table?.map((item2, index2) => {
                  return (
                    <tr className="body-tr" key={index2}>
                      <td>{item2.name.first}</td>
                      <td>{item2.email}</td>
                      <td>{item2.phone}</td>
                      <td>{item2.dob.age}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          }
        </div>

      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Footer />
      </div>
    </main>
  );
}
export default App;