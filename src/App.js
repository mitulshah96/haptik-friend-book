import Author from './Author';
import FriendBook from './containers';

function App() {
    return (
        <div className="container">
            <div className="card">
                <FriendBook />
            </div>
            <Author />
        </div>
    );
}

export default App;
