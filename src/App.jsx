import { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { motion } from "framer-motion";

export default function App() {
  const [currentAge, setCurrentAge] = useState(66);
  const [startAge, setStartAge] = useState(70);
  const [premium, setPremium] = useState(200000);
  const [income, setIncome] = useState(0);

  const calculateIncome = () => {
    const withdrawalRate = 0.05; // Example: 5% annual withdrawal
    const estimatedIncome = premium * withdrawalRate;
    setIncome(estimatedIncome.toFixed(2));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
          Annuity Income Calculator
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Current Age
            </label>
            <Input
              type="number"
              value={currentAge}
              onChange={(e) => setCurrentAge(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Age to Start Income
            </label>
            <Input
              type="number"
              value={startAge}
              onChange={(e) => setStartAge(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Premium Amount ($)
            </label>
            <Input
              type="number"
              value={premium}
              onChange={(e) => setPremium(Number(e.target.value))}
            />
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={calculateIncome}>
            Calculate Income
          </Button>
          {income > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4 text-center">
                <p className="text-lg text-gray-700">Estimated Yearly Income:</p>
                <motion.h3
                  className="text-3xl font-bold text-green-700 mt-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${income}
                </motion.h3>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
}
