import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Thankyou(){
    const showToastMessage = () => {
        toast.success("Success Notification !", {
            position: "top-right"
        });
    };
    return(
      <div>Thanks!
          <div>
              <button onClick={showToastMessage}>Notify</button>
              <ToastContainer />
          </div></div>


    );

}

