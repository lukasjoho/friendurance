import {
  DefaultToastOptions,
  Toaster as ReactHotToaster,
} from 'react-hot-toast';

const Toaster = () => {
  const options: DefaultToastOptions = {
    // Define default options
    duration: 4000,
    success: {
      style: {
        background: 'rgb(34 197 94)',
        color: 'white',
      },
      iconTheme: {
        primary: 'white',
        secondary: 'rgb(34 197 94)',
      },
    },
    error: {
      style: {
        background: 'rgb(239 68 68)',
        color: 'white',
      },

      iconTheme: {
        primary: 'white',
        secondary: 'rgb(239 68 68)',
      },
    },
  };
  return <ReactHotToaster toastOptions={options} />;
};

export default Toaster;
