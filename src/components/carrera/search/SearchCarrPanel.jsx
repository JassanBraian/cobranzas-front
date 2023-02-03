import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from 'react-bootstrap';
import SearchCarrModal from './SearchCarrModal';
import CarreraSearched from './CarreraSearched';

const SearchCarrPanel = () => {

    const [showSearchCarrModal, setShowSearchCarrModal] = useState(false);

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <h3>Seleccionar Carrera</h3>
                </div>
                <div className="col-6 d-flex justify-content-end mb-1">
                    <Button
                        variant="success"
                        onClick={() => setShowSearchCarrModal(true)}
                    >
                        <FontAwesomeIcon icon={faSearch} />
                    </Button>
                </div>
            </div>

            <CarreraSearched />

            <SearchCarrModal
                show={showSearchCarrModal}
                onHide={() => setShowSearchCarrModal(false)}
            />
        </>
    );
};

export default SearchCarrPanel;