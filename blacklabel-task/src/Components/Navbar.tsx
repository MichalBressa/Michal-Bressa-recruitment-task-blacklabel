function Navbar() {
  const redirectToLinkedIn = () => {
    window.location.href =
      "https://www.linkedin.com/in/michal-bressa-011305194/";
  };

  return (
    <nav>
      <button
        onClick={() =>
          alert("Sorry, it's just a demo and you are already on the home page")
        }
      >
        Home
      </button>
      <button onClick={redirectToLinkedIn}>Michał Bressa</button>
    </nav>
  );
}

export default Navbar;
