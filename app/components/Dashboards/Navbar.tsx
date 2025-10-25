import LogoutButton from "./LogoutButton";

const Navbar = () => {
  return (
    <>
      <div className="w-full bg-blue-500/60 fixed top-0 right-0 left-0 flex p-5.5 border-b-blue-500">
        <LogoutButton />
      </div>
    </>
  );
};
export default Navbar;
