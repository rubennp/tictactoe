import Link from "../styles/Link.styled";

export default function LinkBio() {
    return (
        <Link className="bio" href="#">
            {/* <p>Rubèn'2023</p> */}
            <img src="./img/ruben-emoji-1.png" alt="Rubèn"/>
            <p>Sobre mi</p>
        </Link>
    );
};
