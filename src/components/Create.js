import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { server } from "../server";

const Create = () => {
  const [namaBarang, setNamaBarang] = useState("");
  const [kategori, setKategori] = useState("");
  const [satuan, setSatuan] = useState("");
  const [harga, setHarga] = useState("");

  // msg
  const [msg, setMsg] = useState("");
  const [msgShow, setMsgShow] = useState(false);

  const navigate = useNavigate();

  const createHandler = async (e) => {
    e.preventDefault();
    try {
      const post = await axios.post(`${server}/barang/create`, {
        nama: namaBarang,
        satuan,
        harga: parseInt(harga),
      });
      setMsg(post.data.msg);
      setMsgShow(true);
    } catch (error) {
      setMsg(error.message);
      setMsgShow(true);
    }
  };
  return (
    <div className="create-wrap container mt-5">
      <form onSubmit={createHandler} className="mt-4">
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

        <div className="text-end">
          <button
            className="btn btn-info"
            type="button"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back
          </button>
          <button className="btn btn-success ms-3" type="submit">
            Create
          </button>
        </div>
      </form>
      {/* Message Modal */}
      <Modal
        show={msgShow}
        onHide={() => {
          setMsgShow(false);
        }}
      >
        <Modal.Body>
          <p className="fw-bold">{msg}</p>
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

export default Create;
