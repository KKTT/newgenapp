import { Link, Outlet, useLocation } from "react-router-dom"
import { buttonVariants } from "@/components/ui/button"

export default function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {isHomePage && (
        <header className="bg-white shadow-sm">
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
                <div className="flex justify-center mb-6">
                  <img 
                    src="/NEWGEN_Logo_Black.png" 
                    alt="Newgen Logo" 
                    className="w-90 h-32 object-contain"
                  />
                </div>
                <Link 
                  to="/annuity" 
                  className={buttonVariants({ 
                    variant: "ghost",
                    className: "w-full p-2 mb-4 bg-green-600 text-white rounded-md hover:bg-green-700"
                  })}
                >
                  Annuity Calculator
                </Link>
                <Link 
                  to="/iul" 
                  className={buttonVariants({ 
                    variant: "ghost",
                    className: "w-full p-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  })}
                >
                  IUL Calculator
                </Link>
          </div>
        </header>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}
