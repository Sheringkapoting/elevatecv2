
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import AuthProfileArea from "./AuthProfileArea";

interface NavbarProps {
  isAuthenticated: boolean;
  profileImage: string | null;
  userName: string | null;
  openLoginDialog: () => void;
  openRegisterDialog: () => void;
  handleLogout: () => void;
  handleProtectedLink: (e: React.MouseEvent<HTMLAnchorElement>, path: string) => void;
}

const Navbar = ({
  isAuthenticated,
  profileImage,
  userName,
  openLoginDialog,
  openRegisterDialog,
  handleLogout,
  handleProtectedLink,
}: NavbarProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm fixed w-full z-20 top-0 left-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-16 px-6">
        <Logo />
        <NavLinks handleProtectedLink={handleProtectedLink} />
        <AuthProfileArea
          isAuthenticated={isAuthenticated}
          profileImage={profileImage}
          userName={userName}
          openLoginDialog={openLoginDialog}
          openRegisterDialog={openRegisterDialog}
          handleLogout={handleLogout}
        />
      </div>
    </nav>
  );
};

export default Navbar;
