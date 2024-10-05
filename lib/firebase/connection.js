import { initializeApp } from 'firebase/app';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

const config = {
    //firebase config
}

const app = initializeApp(config);

const storage = getStorage(app);

connectStorageEmulator(storage, 'localhost', 9199);

export { storage };
