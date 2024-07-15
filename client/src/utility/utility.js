import Swal from 'sweetalert2'
import Cookies from "js-cookie";

export function unauthorized(code) {
    if (code === 401) {
        sessionStorage.clear();
        localStorage.clear();
        Cookies.set("token","")
        window.location.href = "/login";
    }
}

export function setEmail(email) {
    sessionStorage.setItem("email", email)
}

export function getEmail() {
   return sessionStorage.getItem("email")
}

export function timeStampToDate(timestamp) {
    let date = new Date(timestamp)
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear()
}

export async function DeleteAlert(text,btnTXT) {
    const result = await Swal.fire({
        title: "Are You Sure!",
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: btnTXT,
        allowOutsideClick: false
    })
    return result.isConfirmed

}

export async function SuccessAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "success",
        confirmButtonColor: "#198754",
        confirmButtonText: "OK",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async function FailAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "warning",
        confirmButtonColor: "#fcac3f",
        confirmButtonText: "Try Again",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}

export async function InfoAlert(msg) {
    const result = await Swal.fire({
        text: msg,
        icon: "info",
        confirmButtonColor: "#198754",
        confirmButtonText: "Go Ahead",
        allowOutsideClick: false
    });
    return result.isConfirmed;
}