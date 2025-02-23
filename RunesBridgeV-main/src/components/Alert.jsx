import { useSelector, useDispatch } from 'react-redux';
import { setAlert } from '../store/ui';

function Alert() {
    const dispatch = useDispatch();
    const alert = useSelector((state) => state.alert);

    if (!alert.message) return null;

    return (
        <div className={`fixed w-full z-[100]`}>
            <div className={`w-[90%] sm:w-[50%] mx-auto flex items-center justify-between px-4 py-1 text-white border-black border-2 rounded-xl ${alert.type === 'success' ? 'border-green-600' : 'border-red-600'} bg-[#062832] mt-4`}>
                <p>{alert.message}</p>
                <button onClick={() => dispatch(setAlert({ message: '', type: 'success' }))}>X</button>
            </div>
        </div>
    );
};

export default Alert;
