import { useContext } from 'react';
import { AppContext } from '../context/AppContextObject';

export const useApp = () => useContext(AppContext);