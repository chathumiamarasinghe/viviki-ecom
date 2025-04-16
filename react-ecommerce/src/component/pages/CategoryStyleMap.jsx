import industrialImg from '../../assets/common/industrial.png';
import AgriImg from '../../assets/common/gloves.png';
import householdImg from '../../assets/common/household.png';
import psImg from '../../assets/common/automobile.png';
import vrImg from '../../assets/common/naturalraw.png';
import echoImg from '../../assets/common/molds.png';
import fallbackImg from '../../assets/common/fallback.png'; 


export const categoryStyles = {
  'Industrial': {
    image: industrialImg,
    bgColor: '#0f0f0f',
    textColor: '#fff',
    btnColor: '#f44336',
    btnTextColor: '#fff'
  },
  'Household': {
    image: householdImg,
    bgColor: '#fbc02d',
    textColor: '#000',
    btnColor: '#fff',
    btnTextColor: '#fbc02d'
  },
  'Agricultural base products': {
    image: AgriImg,
    bgColor: '#e53935',
    textColor: '#fff',
    btnColor: '#fff',
    btnTextColor: '#e53935'
  },
  'Automobile base products': {
    image: psImg,
    bgColor: '#D3D3D3',
    textColor: '#fff',
    btnColor: '#e53935',
    btnTextColor: '#fff'
  },
  'Raw Sheets': {
    image: vrImg,
    bgColor: '#43a047',
    textColor: '#fff',
    btnColor: '#fff',
    btnTextColor: '#43a047'
  },
  'molds': {
    image: echoImg,
    bgColor: '#1e88e5',
    textColor: '#fff',
    btnColor: '#fff',
    btnTextColor: '#1e88e5'
  }
};

// Default style for unknown categories
export const defaultStyle = {
  image: fallbackImg,
  bgColor: '#e0e0e0',
  textColor: '#000',
  btnColor: '#ffffff',
  btnTextColor: '#000000'
};
