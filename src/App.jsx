import React, {useEffect, useState} from 'react';
import IMask from 'imask';
import './App.css';
import axios from "axios";


function App() {

    const [name, setname] = useState('')
    const [phone, setphone] = useState('')
    const [message, setmessage] = useState('')
    const [nameDirty, setnameDirty] = useState(false)
    const [phoneDirty, setPhoneDirty] = useState(false)
    const [messageDirty, setmessageDirty] = useState(false)
    const [nameError, setnameError] = useState('поля Имя не может быть пустым')
    const [phoneError, setPhoneError] = useState('поля Телефон не может быть пустым')
    const [messageError, setmessageError] = useState('поля Сообщение не может быть пустым')

    const [formValid, setFormValid] = useState(false)


    const [show, setShow] = useState(false)
    const [showSec, setShowSec] = useState(false)
    const [goToR, isgoToR] = useState(false)


    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'name':
                setnameDirty(true)
                break
            case 'message':
                setmessageDirty(true)
                break
            case 'phone':
                setPhoneDirty(true)
                break
        }
    }

    useEffect(() => {
        var phone = document.getElementById('phonenumber');
        var maskOptions = {
            mask: '+{7}(000)000-00-00'
        };
        var mask = IMask(phone, maskOptions);
    }, [])

    useEffect(() => {
        if (nameError || messageError || phoneError) {
            setFormValid(false)
        } else {
            setFormValid(true)
        }
    }, [nameError, messageError, phoneError])


    function SendData(e) {
        e.preventDefault()


        // let phoneFF = phone()
        //
        // console.log(phoneFF)

        const PhoneWithOut = phone.replace(/[\(\)\-\']+/g, '')


        let messagestoUser = document.querySelector('.messagestoUser')

        axios
            .post('http://localhost:5000/user', {
                phone: PhoneWithOut,
                name: name,
                message: message
            })
            .then((response) => {
                console.log(response)
                messagestoUser.textContent = 'Успешно'
                messagestoUser.style.color = '#00ff00'
                setTimeout(() => {
                    messagestoUser.textContent = ''
                }, 3000)
            })
            .catch((response) => {
                console.log(response)
                messagestoUser.textContent = 'Поробуйте позже'
                messagestoUser.style.color = 'red'
                setTimeout(() => {
                    messagestoUser.textContent = ''
                }, 3000)
            });


    }

    const nameHandler = (e) => {
        setname(e.target.value)
        const IsNumber = /\d/.test(e.target.value)
        let IsSymbol = /^[\w ]+$/.test(e.target.value);
        if (e.target.value.length < 2) {
            setnameError('не может быть менее 2 букв')
        } else if (IsNumber) {
            setnameError('не может содержать цифры')
        } else if (IsSymbol === false) {
            setnameError('не может содержать символы')
        } else {
            setnameError('')
        }
    }


    const messageHandler = (e) => {
        setmessage(e.target.value)
        if (e.target.value.length < 3) {
            setmessageError('не может быть менее 3 букв')
        } else {
            setmessageError('')
        }
    }

    const phoneHandler = (e) => {


        setphone(e.target.value)
        if (e.target.value.length < 2) {
            setPhoneError('не корректный номер телефона')
        } else {
            setPhoneError('')
        }


    }


    return (
        <div className="App">
            <form>
                <h1>
                    Форма
                </h1>
                {(phoneDirty && phoneError) && <div style={{color: "red"}}>{phoneError}</div>}
                <input onChange={e => phoneHandler(e)} value={phone} onBlur={e => blurHandler(e)} name="phone" required
                       type="text" id="phonenumber" placeholder="+7 (999) 999-99-99"/>
                {(nameDirty && nameError) && <div style={{color: "red"}}>{nameError}</div>}
                <input onChange={e => nameHandler(e)} value={name} onBlur={e => blurHandler(e)} name="name" required
                       type="text" placeholder="имя"/>
                {(messageDirty && messageError) && <div style={{color: "red"}}>{messageError}</div>}
                <textarea onChange={e => messageHandler(e)} value={message} onBlur={e => blurHandler(e)} name="message"
                          required placeholder="сообщение"></textarea>

                <button disabled={!formValid} onClick={(e) => {
                    SendData(e);
                    setShow(true)
                }}>Submit
                </button>


                <h1 className="messagestoUser"></h1>

                <div className="popupdetailfwpruhwe" style={show ? null : {display: 'none'}}>
                    <div className="modfdfsdafasal-content">
                        <div
                            className={goToR ? "modal-content model-content-fooo oformitzayavka gomodaldetailfgg werwertttt" : "modal-content oformitzayavka model-content-fooo werwertttt"}>
                                <span onClick={() => {
                                    setname('')
                                    setphone('')
                                    setmessage('')
                                    setShow(false)
                                    setFormValid(false)
                                }}
                                ><img className="close" src="../img/img-delete.png" alt=""/></span>
                            <h1 className="detailpopuptitle">Модальное окно</h1>

                            <h1 className="modal__info">Телефон номер: <span>{phone}</span></h1>
                            <h1 className="modal__info">Имя: <span>{name}</span></h1>
                            <h1 className="modal__info">Сообщение: <span>{message}</span></h1>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default App;
