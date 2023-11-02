import './App.css';
import Card from './component/Card/Card'; // Import the Card component
import AddPasscodeComponent from './component/Passcode/AddPasscode';
import DeletePasscodeComponent from './component/Passcode/DeletePasscode';
import GetPasscodeComponents from './component/Passcode/GetPasscode';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Main">
          <Card
            title="Locker"
            content="Click on the button to generate a new Passcode"
            imageUrl="https://example.com/your-image-url.jpg"
          />
        </div>
        <AddPasscodeComponent/>
        <DeletePasscodeComponent/>
        <GetPasscodeComponents />
      </header>
    </div>
  );
}

export default App;
