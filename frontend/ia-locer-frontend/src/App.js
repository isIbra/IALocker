import './App.css';
import Card from './component/Card/Card'; // Import the Card component

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
      </header>
    </div>
  );
}

export default App;
