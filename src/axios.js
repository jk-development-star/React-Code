import React from "react"

function setHeader() {
    const token = localStorage.getItem('token');
    if (!token) {

    } else {
        const setHeades = {
            headers: {
                authorization: token
            }
        }

    }
}

export default setHeader
