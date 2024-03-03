import axios from "axios";
import {  useEffect, useState } from "react";

interface ModalProps {
  isOpen: Boolean;
  onClose: () => void;
  imageUrl: string
  id: string
  likes:string 
}

interface PhotoStat { 
  downloads: any
  views: { total: number | string };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, imageUrl,id,likes }) => {
  const [additionalInfo, setAdditionalInfo] = useState<PhotoStat | null>(null); 
  //fetching additional photo stats(views,downloads) for Modal
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.unsplash.com/photos/${id}/statistics?client_id=FuyMmQKj3BlQPoUDmSuSAGpxvEuUjOlF5rlI3x04ECk`);
        setAdditionalInfo(response.data);
      } catch (error) { 
        console.error('Error fetching additional info:', error);
      }
    };

    if (isOpen && id) {
      fetchData();
    }
  }, [isOpen, id]);
  
  if (!isOpen) return null;


  return (
    <div 
    className="bg-gray-800/80 fixed top-0 left-0 w-full h-full overflow-y-auto  flex items-center justify-center z-50" 
    onClick={onClose}>
      <div className="flex relative  bg-white rounded-md">
        <div className="">

        <img 
        className=""
        src={imageUrl} 
        alt="Modal" />
        </div>
        <div className="absolute left-0 bottom-0 bg-gray-300/20 font-bold text-[1.5rem] hover:bg-gray-300/60 w-full">
        <p className="float-end" onClick={onClose}>&times;</p>
          <p>გადმოწერა: {additionalInfo && additionalInfo.downloads.total}</p>
          <p>მოწონება: {additionalInfo && likes}</p>
          <p>ნახვა: {additionalInfo && additionalInfo.views.total}</p>
        </div>
      </div>
    </div>
  );
};


export default Modal