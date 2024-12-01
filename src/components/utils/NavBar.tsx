import { useNavigate } from 'react-router-dom';
import {Button, Navbar,NavbarBrand, NavbarText} from 'reactstrap';
import { logoutTicketguru } from '../../utils/utils';

function TicketguruNav(args) {
  const navigate = useNavigate();

  const role = sessionStorage.getItem('role');

  const logoHref = () => {
    if (role === "ADMIN") return '/admin';
    if (role === "USER") return '/user';
    else return '/login';
  }



  return (
    <div>
      <Navbar {...args} fixed='top' color='success' dark>
        <NavbarBrand href={logoHref()} className='navbar-tg'>TicketGuru</NavbarBrand>
        <NavbarText>
            <Button color='danger' onClick={() => logoutTicketguru(navigate)}>
                Logout
            </Button>
        </NavbarText>
      </Navbar>
    </div>
  );
}

export default TicketguruNav;