import './Home.css';
import AddPasscodeComponent from '../../component/Passcode/AddPasscode';
import DeletePasscodeByCodeComponent from '../../component/Passcode/DeletePasscodeByCode';
import GetPasscodeComponents from '../../component/Passcode/GetPasscode';
import MiddleSection from '../../component/Main/MainContent';

function Home() {
  return (
    <div className="App">
      <div className='home-container'>
        <MiddleSection
          name="Locker 1"
          dynamicContent="Dynamic Content for Locker 1"
          buttonText="Show My Password"
        />
        <MiddleSection
          name="Locker 2"
          dynamicContent="Dynamic Content for Locker 2"
          buttonText="Show My Password"
        />
        <MiddleSection
          name="Locker 3"
          dynamicContent="Dynamic Content for Locker 2"
          buttonText="Show My Password"
        />
      </div>
    </div>
  );
}

export default Home;
