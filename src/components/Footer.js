import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-footer text-white py-8 mt-20 w-full">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-8 mb-8">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-xl font-semibold text-white">Para ventas y postventa:</p>
            <p className="text-2xl font-bold text-white">+569 764 300 38</p>
            <p className='text-white'>Lunes a Domingo de 9 a 19 hrs. </p>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" className="text-white hover:text-gray-400">
              <FaFacebookF size={24} />
            </a>
            <a href="https://www.twitter.com" className="text-white hover:text-gray-400">
              <FaTwitter size={24} />
            </a>
            <a href="https://www.instagram.com" className="text-white hover:text-gray-400">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.youtube.com" className="text-white hover:text-gray-400">
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Conócenos</h3>
            <ul>
              <li><a href="#" className="hover:underline">Nuestra Empresa</a></li>
              <li><a href="#" className="hover:underline">Políticas de Privacidad</a></li>
              <li><a href="#" className="hover:underline">Términos y Condiciones</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Te Ayudamos</h3>
            <ul>
              <li><a href="#" className="hover:underline">Centro de ayuda</a></li>
              <li><a href="/consult" className="hover:underline">Mis viajes</a></li>
              <li><a href="#" className="hover:underline">Documentación de viaje</a></li>
              <li><a href="#" className="hover:underline">Derechos y obligaciones del pasajero</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-white">Encuéntranos en:</h3>
            <ul>
              <li>El Bosque Norte #0430, Las Condes, Santiago.</li>
            </ul>
          </div>
          <div>

            <div className="flex justify-center md:justify-start">
              <Image
                src="/webpay-logo-1.png"
                alt="Logo"
                width={200} // Ajusta el ancho según sea necesario
                height={80} // Ajusta la altura según sea necesario
              />
            </div>
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} Viajandoen. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
