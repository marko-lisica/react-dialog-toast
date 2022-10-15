import { useState } from 'react';
import Modal from './components/modal/Modal';
import Toast from './components/toast/Toast';

function App() {

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isToastOpen, setIsToastOpen] = useState<boolean>(false);

  return (
    <div>
      <h1>Modal component</h1>
      
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <p>This is paragraph. This is modal's children.</p>
        <button onClick={() => {setIsOpen(false); console.log("clicked")}}>Close</button>
        <button style={{ background: "blue" }}>Confirm</button>
      </Modal>

      <hr style={{margin: "24px 0 24px 0"}} />
      
      <button onClick={() => setIsToastOpen(true)}>Open toast</button>

      <Toast
        open={isToastOpen}
        onClose={() => setIsToastOpen(false)}
        dismissToast={setIsToastOpen}
        timeout={3000}
        placement="bottom-middle"
        />

    </div>
  );
}

export default App;