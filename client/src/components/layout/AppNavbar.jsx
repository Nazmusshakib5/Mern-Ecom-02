import React, {useEffect} from "react";
import logo from "../../assets/images/plainb-logo.svg";
import {Link} from "react-router-dom";
import ProductStore from "../../store/ProductStore.js";
import UserStore from "../../store/UserStore.js";
import {DeleteAlert} from "../../utility/utility.js";
import CartStore from "../../store/CartStore.js";
import Cookies from "js-cookie";
import WishStore from "../../store/WishStore.js";

const AppNavbar = () => {
    const {SearchKeyword, setSearchKeyword} = ProductStore()
    const {isLogin, UserLogoutRequest} = UserStore()
    const {CartCount, CartListRequest} = CartStore()
    const {WishCount, WishListRequest} = WishStore()
    const onLogout = async () => {
        let confirmation = await DeleteAlert("You Will Redirect To Your Home Page And For Some Features You Have To Login Again", "Logout")
        if (confirmation) {
            await UserLogoutRequest();
            sessionStorage.clear();
            localStorage.clear();
            if (isLogin()) {
                Cookies.set("token","")
            }
            window.location.href = "/"
        }
    }
    useEffect(() => {
        (async () => {
            if (isLogin()) {
                await CartListRequest()
                await WishListRequest()
            }
        })()
    }, []);
    return (<>
        <div className="container-fluid d-none d-md-block text-white p-2 bg-success">
            <div className="container">
                <div className="row  align-items-center justify-content-around">
                    <div className="col-xs-12 col-md-6">
                            <span>
                                <span className="fs-6">
                                    <i className="bi bi-envelope"></i> Support@sellmode.com
                                </span>
                                <span className="fs-6 mx-2">
                                    <i className="bi bi-phone"></i> 01757416917
                                </span>
                            </span>
                    </div>
                    <div className="col-xs-12 col-md-6">
                            <span className="float-end">
                                <span className="bodySmal mx-2">
                                    <a href="https://wa.me/01757416917?text=Hello%20there!" target="_blank"
                                       className="text-white" rel="noopener noreferrer">
                                    <i className="bi bi-whatsapp fs-5"></i>
                                    </a>
                                </span>
                                <span className="bodySmal mx-2">
                                    <a href="https://www.youtube.com/channel/UCt4vNYVKZ4-TUH0kBGe-gfw"
                                       className="text-white" target="_blank">
                                    <i className="bi bi-youtube fs-5"></i>
                                    </a>
                                </span>
                                <span className="bodySmal mx-2">
                                    <a href="https://www.facebook.com/ahamedtonmuysifat23" className="text-white"
                                       target="_blank">
                                    <i className="bi bi-facebook fs-5"></i>
                                    </a>
                                </span>
                            </span>
                    </div>
                </div>
            </div>
        </div>
        <nav className="navbar shadow-sm  bg-white navbar-expand-lg sticky-top navbar-light py-3">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img className="img-fluid" src={logo} alt="" width="96px"/>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav06"
                        aria-controls="nav06" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="nav06">
                    <ul className="navbar-nav mt-3 mt-lg-0 mb-3 mb-lg-0 ms-lg-3">
                            <span className="nav-item me-4">
                                <Link className="btn ms-4 btn-light position-relative" to="/">
                                    <i className="bi bi-house"></i> Home
                                </Link>
                                <Link to={isLogin() ? "/cart" : "/login"} type="button"
                                      className="btn ms-4 btn-light position-relative">
                                   <i className="bi text-dark bi-bag"></i> Cart
                                    {CartCount > 0 && (<span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                       {CartCount}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>)}
                                </Link>
                                <Link to={isLogin() ? "/wish" : "/login"} type="button"
                                      className="btn ms-4 btn-light position-relative">
                                   <i className="bi text-dark bi-heart"></i> Wish
                                    {WishCount > 0 && (<span
                                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
                                       {WishCount}
                                        <span className="visually-hidden">unread messages</span>
                                    </span>)}
                                </Link>

                                <Link to={isLogin() ? "/orders" : "/login"} type="button"
                                      className="btn ms-4 btn-light position-relative">
                                   <i className="bi text-dark  bi-truck"></i> Orders
                                </Link>
                                <div className="d-block d-md-none my-4 mx-4" style={{color:"#0d6efd"}}>
                                    <div className="mb-3">
                                        <i className="bi bi-envelope mb-3"></i> Support@sellmode.com
                                    </div>
                                    <div className="mb-3">
                                        <i className="bi bi-phone mb-3"></i> 01757416917
                                    </div>
                                    <div>
                                        <a href="https://wa.me/01757416917?text=Hello%20there!" target="_blank"
                                           className="bodySmal me-3 mt-3" rel="noopener noreferrer">
                                    <i className="bi bi-whatsapp fs-5"></i>
                                    </a>
                                    <a href="https://www.youtube.com/channel/UCt4vNYVKZ4-TUH0kBGe-gfw"
                                       className="bodySmal me-3 mt-3" target="_blank">
                                    <i className="bi bi-youtube fs-5"></i>
                                    </a>
                                    <a href="https://www.facebook.com/ahamedtonmuysifat23"
                                       className="bodySmal me-3 mt-3"
                                       target="_blank">
                                    <i className="bi bi-facebook fs-5"></i>
                                    </a>
                                    </div>

                                </div>

                            </span>
                    </ul>

                    <div className="ms-lg-5 d-lg-flex">
                        <div className="input-group">
                            <input onChange={(e) => setSearchKeyword(e.target.value)} className="form-control"
                                   type="search" placeholder="Search" aria-label="Search"/>
                            <Link to={SearchKeyword.length > 0 ? `/by-keyword/${SearchKeyword}` : `/`}
                                  className="btn btn-outline-dark" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" style={{width: 24, height: 24}}>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0
                                    7 7 0 0114 0z"/>
                                </svg>
                            </Link>
                        </div>
                        {isLogin() ? (<>
                                <Link type="button"
                                      className="btn mt-4 mt-lg-0 ms-0 ms-lg-3 btn-success d-flex justify-content-center"
                                      to="/profile">Profile</Link>
                                <Link onClick={onLogout} type="button"
                                      className="btn ms-0 ms-lg-3 mt-4 mt-lg-0 btn-success d-flex justify-content-center"
                                >Logout</Link>
                            </>

                        ) : (<Link to="/login" type="button"
                                   className="btn mt-4 mt-lg-0 ms-0 ms-lg-3 btn-success d-flex justify-content-center">Login</Link>

                        )}

                    </div>
                </div>
            </div>
        </nav>
    </>);
};

export default AppNavbar;
