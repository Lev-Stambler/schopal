import React, { useState } from 'react';
import Modal from 'react-modal';
import { ScholarsDB } from '@foodmedicine/interfaces';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface ModalChooseProps {
  onClose: (db: ScholarsDB) => unknown;
  initialDB: ScholarsDB;
}

Modal.setAppElement('#root');

export function ModalChooserDB(props: ModalChooseProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [db, setDB] = useState(props.initialDB);
  function openModal() {
    setIsOpen(true);
  }


  function closeModal() {
    setIsOpen(false);
    props.onClose(db);
  }

  return (
    <div>
      <button onClick={openModal}>Select a scholarly database</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>Select which database you would like to search</div>
        <form>
          <div>
            <input
              type="radio"
              id="arxiv-radio-btn"
              name="db-type"
              checked={db === ScholarsDB.ARXIV ? true : false}
              onClick={() => setDB(ScholarsDB.ARXIV)}
            />
            <label htmlFor="arxiv-radio-btn">Arxiv</label>
          </div>
          <div>
            <input
              type="radio"
              id="europepmc-radio-btn"
              name="db-type"
              checked={db === ScholarsDB.EUROPE_PMC ? true : false}
              onClick={() => setDB(ScholarsDB.EUROPE_PMC)}
            />
            <label htmlFor="europepmc-radio-btn">EuropePMC</label>
          </div>
        </form>
        <button onClick={closeModal}>close</button>
      </Modal>
    </div>
  );
}
