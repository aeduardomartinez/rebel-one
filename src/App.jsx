import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import PaginaInicio from './modulos/inicio/PaginaInicio';
import PaginaInventario from './modulos/inventario/PaginaInventario';
import PaginaIngresos from './modulos/ingresos/PaginaIngresos';
import PaginaContactos from './modulos/contactos/PaginaContactos';
import PaginaGastos from './modulos/gastos/PaginaGastos';
import PaginaReportes from './modulos/reportes/PaginaReportes';

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<PaginaInicio />} />
          <Route path="/inventario" element={<PaginaInventario />} />
          <Route path="/sales" element={<PaginaIngresos />} />
          <Route path="/gastos" element={<PaginaGastos />} />
          <Route path="/contactos" element={<PaginaContactos />} />
          <Route path="/reportes" element={<PaginaReportes />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

export default App;
