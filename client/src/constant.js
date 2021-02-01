import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import SentimentSatisfiedAltRoundedIcon from '@material-ui/icons/SentimentSatisfiedAltRounded';
import FormatAlignCenterRoundedIcon from '@material-ui/icons/FormatAlignCenterRounded';
import CancelScheduleSendRoundedIcon from '@material-ui/icons/CancelScheduleSendRounded';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import ChildCareRoundedIcon from '@material-ui/icons/ChildCareRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import StoreRoundedIcon from '@material-ui/icons/StoreRounded';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import WorkIcon from '@material-ui/icons/Work';
import SearchIcon from '@material-ui/icons/Search';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import Timer3Icon from '@material-ui/icons/Timer3';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';

export const liveStockProviderLogo = 'https://i.imgur.com/nJE4CTe.png';


export const outlineButton = 'bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded hover:text-white focus:outline-none';

export const outlineButtonWhite = 'bg-transparent hover:bg-white text-white font-semibold py-2 px-4 border border-white hover:border-transparent rounded hover:text-black focus:outline-none';

export const centerVertically = 'flex h-screen justify-center items-center content-center flex-col space-y-5';

export const clientIDimgur = '3e176bd35033ad9';


export const imagesClient = [

    {
      url:'https://www.apple.com/newsroom/images/values/community-outreach/apple_world-aids-day-2020_hero_12012020_big.jpg.large.jpg',
      title: 'Ver productos',
      width: '100%',
      route:'/mis-productos'
    },
    {
      url:'https://cdn.hipwallpaper.com/i/65/74/nK37Y2.jpg',
      title: 'Mi cuenta',
      width: '50%',
      route:'/mi-cuenta'
    },
    {
      url:'https://c0.wallpaperflare.com/preview/621/536/893/network-operator-service-provider.jpg',
      title: 'Mi proveedor',
      width: '50%',
      route:'/mi-proveedor'
    },
    {
      url:'https://wallpaperstock.net/wallpapers/thumbs1/40848hd.jpg',
      title:'Cerrar sesion',
      width:'100%',
      isLogout:true

    }

];

export const images = [
    {
      url:'https://johannesippen.com/img/blog/humans-not-users/header.jpg',
      title: 'Añadir clientes',
      width: '50%',
      route:'/agregar-cliente'
    },
    { 

      url:'https://wallpapercave.com/wp/wp5470558.jpg',
      title: 'Eliminar clientes',
      width: '50%',
      route:'/eliminar-cliente'

     
    },
    {
      url: 'https://cdn.wallpaper.com/main/styles/fp_1540x944/s3/2018/03/samsungnewfeature.jpg',
      title: 'Añadir productos',
      width: '50%',
      route:'/agregar-producto'
    },
    {
      url:'https://www.apple.com/newsroom/images/values/community-outreach/apple_world-aids-day-2020_hero_12012020_big.jpg.large.jpg',
      title: 'Ver productos',
      width: '50%',
      route:'/mis-productos'
    },
    {
        url:'https://cdn.hipwallpaper.com/i/65/74/nK37Y2.jpg',
        title: 'Mi cuenta',
        width: '50%',
        route:'/mi-cuenta'
    },
    {
      url:'https://wallpaperstock.net/wallpapers/thumbs1/40848hd.jpg',
      title:'Cerrar sesion',
      width:'50%',
      isLogout:true

    }
];

export const advantages = [ 
        
  { 
      title:'Tu cliente no pierde el tiempo', 
      text:'Evita que el cliente tenga que llamar todo el tiempo o ir al local para poder tener conocimiento del stock de tus productos.', firstIcon:TimerRoundedIcon, secondIcon:SentimentSatisfiedAltRoundedIcon 
  },
  {
      title:'Centraliza la informacion',
      text:'Compila la informacion de todos tus productos en un solo lugar, sin limites de usuarios ni informacion',
      firstIcon:InfoRoundedIcon,
      secondIcon:FormatAlignCenterRoundedIcon
  },
  {

      title:'Olvidate de la difusion tipica por mensajerias',
      text:'Deja de perder el tiempo en contestar a diversas personas la misma informacion. Automatiza los procesos repetitivos y hace todo de una unica vez',
      firstIcon:CancelScheduleSendRoundedIcon,
      secondIcon:CallEndRoundedIcon

  },
  {

      title:'Ayuda a los pequeños emprendedores',
      text:'Los pequeños emprendedores no tienen grandes sumas de dinero, es por ello que venden por encargo. Con la informacion, ellos van a poder saber que producto se encuentra en stock e ir escalando poco a poco',
      firstIcon:ChildCareRoundedIcon,
      secondIcon:TrendingUpRoundedIcon

  },
  {

      title:'Enfocate en lo importante',
      text:'No pienses mas en estar pendiente al telefono para contestar las mismas preguntas reiteradas veces. Concentrate en brindar la mejor experiencia al usuario cuando este vaya de forma presencial',
      firstIcon:WorkIcon,
      secondIcon:SearchIcon

  },
  {

      title:'Agiliza el proceso de venta',
      text:'Mediante nuestra plataforma, el cliente tiene toda la informacion necesaria para tomar la decision de compra que realizara. Va a tu punto de retiro con una decision tomada.',
      firstIcon:FlashOnIcon,
      secondIcon:Timer3Icon

}
];


export const steps = [
        
  {
      title:'Adquirir una cuenta',
      text:'Obtene tu cuenta mediante nuestra economica membresia, de manera segura y con flexibilidad en los metodos de pago',
      Icon:AccountCircleRoundedIcon

  },
  {

      title:'Publicar los productos',
      text:'Subis a tu perfil los productos que tenes en stock, dando a conocer sus detalles mas importantes',
      Icon:StoreRoundedIcon


  },
  {

      title:'Crear las cuentas-cliente',
      text:'Administra las cuentas de aquellos usuarios que pueden o no obtener tu informacion, teniendo control total de ello',
      Icon:AddBoxRoundedIcon

  },
  {

    title:'Informar a tus clientes la revolucion',
    text:'Debes avisarle a tus clientes que la informacion de tu flujo de stock se encuentra en Live Stock Provider, indicandoles su respectivo nombre de usuario y password',
    Icon:RecordVoiceOverIcon

  }
];

export const linkSignInProvider = '/proveedor/?auth=sign_in&type=provider';

export const linkSignInClient = '/cliente/?auth=sign_in&type=client';

export const linkValidatePayment = '/payment/?kind_of=membership&to_know=validation';
