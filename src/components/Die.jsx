export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "",
    };

    return (
        <button
            onClick={() => props.hold(props.id)}
            style={styles}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, ${
                props.isHeld ? "held" : "not held"
            }`}
        >
            {props.value}
        </button>
    );
}
