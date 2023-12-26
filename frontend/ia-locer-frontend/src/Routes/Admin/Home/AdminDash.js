import './AdminDash.css';
import AddPasscodeComponent from '../../../component/Passcode/AddPasscode';
import DeletePasscodeByCodeComponent from '../../../component/Passcode/DeletePasscodeByCode';
import GetPasscodesComponent from '../../../component/Passcode/GetPasscode';
import MiddleSection from '../../../component/Main/MainContent';

function AdminDashboard() {
  const isDisabled = true;
  return (
    <div className="App">
      <div className='home-container'>
        <MiddleSection
          name="Locker 55"
          dynamicContent="Dynamic Content for Locker 1"
          buttonText="Show Password"
        />
        <MiddleSection
          name="Locker 2"
          dynamicContent="Dynamic Content for Locker 2"
          buttonText="Show Password"
          disabled={isDisabled}
        />
        <AddPasscodeComponent />
        <DeletePasscodeByCodeComponent />
      </div>
    </div>
  );
}

export default AdminDashboard;
