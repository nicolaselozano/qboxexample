export const AboutUs = () => {
    return (
      <section id="aboutUs" className="flex flex-col md:flex-row items-center bg-[#02020262] text-white p-8">

        <div className="w-full md:w-1/2">
          <img 
            src="https://media.post.rvohealth.io/wp-content/uploads/sites/2/2022/04/GRT-01.03.CableBicepsBar.gif"
            alt="Gym Training" 
            className="w-full h-auto object-cover"
          />
        </div>

      <div className="w-full md:w-1/2 p-10">
        <h3 className="text-[#ff4200] text-lg font-bold uppercase mb-10">Sobre Nosotros</h3>
        <h2 className="text-4xl font-[Noto_Serif] font-extrabold mb-4">Beneficios de Unirte a Nuestro Gimnasio</h2>
        <p className="text-lg mb-6">
          Entrenar todos los días mejora tu salud cardiovascular, fortalece tus músculos, ayuda a mantener un peso saludable y aumenta tu bienestar mental. 
          Una rutina de ejercicio constante te hará sentir con más energía y motivación.
        </p>

        <ul className="space-y-3">
          <li className="flex items-center">
            ✅ <span className="ml-2">Aumenta la resistencia física</span>
          </li>
          <li className="flex items-center">
            ✅ <span className="ml-2">Mejora la definición muscular</span>
          </li>
          <li className="flex items-center">
            ✅ <span className="ml-2">Acelera el metabolismo y quema más calorías</span>
          </li>
        </ul>
      </div>
    </section>
    );
  };