// Address.jsx

function Address({ street, city, state, zip }) {
    return (
        <div>
            <h3>Address:</h3>
            <p>{street}</p>
            <p>{city}, {state} {zip}</p>
        </div>
    );
}

export default Address;
