import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from "lucide-react";

export default function Weather() {
  const currentDate = new Date();
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const forecast = [
    { day: 'Hoje', temp: 28, icon: Sun, desc: 'Ensolarado' },
    { day: 'Amanhã', temp: 26, icon: Cloud, desc: 'Parcialmente nublado' },
    { day: days[(currentDate.getDay() + 2) % 7], temp: 24, icon: CloudRain, desc: 'Chuva leve' },
    { day: days[(currentDate.getDay() + 3) % 7], temp: 25, icon: Cloud, desc: 'Nublado' },
    { day: days[(currentDate.getDay() + 4) % 7], temp: 27, icon: Sun, desc: 'Ensolarado' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="text-white mb-8">
          <h1 className="text-4xl font-bold mb-2">São Paulo</h1>
          <p className="text-blue-100">
            {currentDate.toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: 'numeric',
              month: 'long'
            })}
          </p>
        </div>

        {/* Current Weather */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[32px] p-8 mb-6 shadow-2xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-7xl font-light text-white mb-2">28°</div>
              <div className="text-xl text-blue-50">Ensolarado</div>
            </div>
            <Sun className="w-24 h-24 text-yellow-300" />
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
            <div className="text-center">
              <Wind className="w-5 h-5 text-blue-100 mx-auto mb-2" />
              <div className="text-sm text-blue-100">15 km/h</div>
              <div className="text-xs text-blue-200">Vento</div>
            </div>
            <div className="text-center">
              <Droplets className="w-5 h-5 text-blue-100 mx-auto mb-2" />
              <div className="text-sm text-blue-100">65%</div>
              <div className="text-xs text-blue-200">Umidade</div>
            </div>
            <div className="text-center">
              <Gauge className="w-5 h-5 text-blue-100 mx-auto mb-2" />
              <div className="text-sm text-blue-100">1013 hPa</div>
              <div className="text-xs text-blue-200">Pressão</div>
            </div>
          </div>
        </div>

        {/* Forecast */}
        <div className="bg-white/20 backdrop-blur-xl rounded-[32px] p-6 shadow-2xl">
          <h2 className="text-white font-semibold mb-4 text-lg">Próximos dias</h2>
          <div className="space-y-3">
            {forecast.map((day, index) => {
              const Icon = day.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/10 rounded-2xl p-4 hover:bg-white/20 transition-all"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <Icon className="w-8 h-8 text-yellow-300" />
                    <div>
                      <div className="text-white font-medium">{day.day}</div>
                      <div className="text-sm text-blue-100">{day.desc}</div>
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-white">{day.temp}°</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Details */}
        <div className="mt-6 bg-white/10 backdrop-blur-xl rounded-2xl p-4">
          <div className="flex items-center justify-between text-blue-50">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span className="text-sm">Visibilidade: 10 km</span>
            </div>
            <div className="text-sm">UV: Moderado</div>
          </div>
        </div>

        <div className="text-center mt-6 text-blue-100 text-sm">
          Atualizado às {currentDate.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}
