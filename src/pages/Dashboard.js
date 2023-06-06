import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

// Components

import { server } from "../server";

const Dashboard = () => {
  const navigate = useNavigate();
  const [barang, setBarang] = useState("");

  // Show Modal
  const [showCreate, setShowcreate] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const handleClose = () => setShowcreate(false);

  const accessToken = sessionStorage.getItem("accessToken");
  const decode = jwt_decode(accessToken);

  // Add input
  const [idBarang, setIdBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [kategori, setKategori] = useState("");
  const [satuan, setSatuan] = useState("");
  const [harga, setHarga] = useState("");

  // msg
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);

  const isLogin = async () => {
    try {
      if (!accessToken) {
        navigate("/404");
      } else {
        if (!decode.userId) return navigate("/404");
      }
    } catch (error) {
      console.log(error.message);
      if (error.message) return navigate("/404");
    }
  };

  const getBarang = async () => {
    try {
      const get = await axios.get(`${server}/barang/get`);
      setBarang(get.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isLogin();
    getBarang();
  });

  const Logout = async () => {
    try {
      await axios.delete(`${server}/logout`);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${server}/barang/create`, {
        nama: namaBarang,
        satuan,
        harga: parseInt(harga),
      });
      setShowcreate(false);
      setMsg(post.data.msg);
      setMsgShow(true);
    } catch (error) {
      setShowcreate(false);
      setMsg(false);
      setMsgShow(true);
    }
  };

  const getById = async (id) => {
    try {
      const getOne = await axios.get(`${server}/barang/one/${id}`);
      if (getOne.data.data !== null) {
        setIdBarang(getOne.data.data.id);
        setNamaBarang(getOne.data.data.nama);
        setHarga(getOne.data.data.harga);
        setSatuan(getOne.data.data.satuan);
        setKategori(getOne.data.data.kategori);
        setShowUpdate(true);
      } else {
        setMsg(false);
        setMsgShow(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const put = await axios.put(`${server}/barang/${idBarang}`, {
        nama: namaBarang,
        satuan,
        harga: parseInt(harga),
      });
      setShowUpdate(false);
      setMsg(put.data.msg);
      setMsgShow(true);
    } catch (error) {
      showUpdate(false);
      setMsg(false);
      setMsgShow(true);
    }
  };
  const deleteHandler = async () => {
    try {
      const del = await axios.delete(`${server}/barang/${idBarang}`);
      setShowDelete(false);
      setMsg(del.data.msg);
      setMsgShow(true);
    } catch (error) {
      setShowDelete(false);
      setMsg(false);
      setMsgShow(true);
    }
  };

  let num = 1;
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Welcome, {decode.last_name}</h1>
      </div>
      <button
        className="btn btn-success me-4"
        onClick={() => {
          setShowcreate(true);
        }}
      >
        TAMBAH
      </button>
      <button
        className="btn btn-danger"
        onClick={() => {
          Logout();
        }}
      >
        LOGOUT
      </button>

      <table className="table align-items-center mt-4">
        <thead>
          <tr className="fw-bold text-center">
            <td>No</td>
            <td>Nama</td>
            <td>Kategori</td>
            <td>Satuan</td>
            <td>Harga</td>
            <td>Di buat</td>
            <td>Di update</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {Object.values(barang).map((data) => (
            <tr className="text-center">
              <td>{num++}</td>
              <td className="text-justify">{data.nama}</td>
              <td>{data.kategori === null ? "-" : data.kategori}</td>
              <td>{data.satuan}</td>
              <td>Rp. {data.harga}</td>
              <td>{data.createdAt.slice(0, 10)}</td>
              <td>{data.updatedAt.slice(0, 10)}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => {
                    getById(data.id);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    setIdBarang(data.id);
                    setShowDelete(true);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Create Modal */}
      <Modal show={showCreate} onHide={handleClose}>
        <form onSubmit={createHandler} className="mt-4">
          <Modal.Header closeButton>
            <Modal.Title>Create Barang</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="namabarang" className="form-label">
                Nama Barang
              </label>
              <input
                type="text"
                id="namabarang"
                className="form-control"
                placeholder="Type Barang"
                value={namaBarang}
                onChange={(e) => {
                  setNamaBarang(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="ktg" className="form-label">
                    Kategori
                  </label>
                  <input
                    type="text"
                    id="ktg"
                    className="form-control"
                    placeholder="Type Category"
                    value={kategori}
                    onChange={(e) => {
                      setKategori(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="satuan" className="form-label">
                    Satuan
                  </label>
                  <input
                    type="text"
                    id="satuan"
                    className="form-control"
                    placeholder="Type satuan"
                    value={satuan}
                    onChange={(e) => {
                      setSatuan(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="harga" className="form-label">
                Harga
              </label>
              <input
                type="number"
                id="harga"
                className="form-control"
                placeholder="Type Harga"
                value={harga}
                onChange={(e) => {
                  setHarga(e.target.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <div className="text-center">
              <button className="btn btn-success" type="submit">
                Create
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      {/* End Create Modal */}

      {/* Update Modal */}
      <Modal
        show={showUpdate}
        onHide={() => {
          setShowUpdate(false);
        }}
      >
        <form onSubmit={updateHandler} className="mt-4">
          <Modal.Header closeButton>
            <Modal.Title>Create Barang</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group mb-3">
              <label htmlFor="namabarang" className="form-label">
                Nama Barang
              </label>
              <input
                type="text"
                id="namabarang"
                className="form-control"
                placeholder="Type Barang"
                value={namaBarang}
                onChange={(e) => {
                  setNamaBarang(e.target.value);
                }}
              />
            </div>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="ktg" className="form-label">
                    Kategori
                  </label>
                  <input
                    type="text"
                    id="ktg"
                    className="form-control"
                    placeholder="Type Category"
                    value={kategori === null ? "-" : kategori}
                    onChange={(e) => {
                      setKategori(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group mb-3">
                  <label htmlFor="satuan" className="form-label">
                    Satuan
                  </label>
                  <input
                    type="text"
                    id="satuan"
                    className="form-control"
                    placeholder="Type satuan"
                    value={satuan}
                    onChange={(e) => {
                      setSatuan(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="harga" className="form-label">
                Harga
              </label>
              <input
                type="number"
                id="harga"
                className="form-control"
                placeholder="Type Harga"
                value={harga}
                onChange={(e) => {
                  setHarga(e.target.value);
                }}
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                setShowUpdate(false);
              }}
            >
              Close
            </Button>
            <div className="text-center">
              <button className="btn btn-success" type="submit">
                Update
              </button>
            </div>
          </Modal.Footer>
        </form>
      </Modal>
      {/* End Update Modal */}

      {/* Message Modal */}
      <Modal
        show={showDelete}
        onHide={() => {
          setShowDelete(false);
        }}
      >
        <Modal.Body>
          <p className="fw-bold text-center text-danger">
            Apakah Kamu Yakin Menghapus data ini?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowDelete(false);
            }}
          >
            Close
          </Button>
          <button className="btn btn-danger" onClick={deleteHandler}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
      {/* End Message Modal */}

      {/* Message Modal */}
      <Modal show={msgShow} onHide={handleClose}>
        <Modal.Body>
          {msg === false ? (
            <p className="fw-bold text-center text-danger">{msg}</p>
          ) : (
            <p className="fw-bold text-center text-success">{msg}</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setMsgShow(false);
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* End Message Modal */}
    </div>
  );
};

export default Dashboard;
