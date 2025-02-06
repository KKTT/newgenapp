import { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { RadioGroup, RadioGroupItem } from "./components/ui/radio-group";
import { Label } from "./components/ui/label";
import { motion } from "framer-motion";

export default function Annuity() {  
  const [currentAge, setCurrentAge] = useState(50);
  const [incomeAge, setInomeAge] = useState(60);
  const [premium, setPremium] = useState(100000);
  const [income, setIncome] = useState(0);
  const [currentAgeWarning, setCurrentAgeWarning] = useState("");
  const [incomeAgeWarning, setInomeAgeWarning] = useState("");
  const [premiumWarning, setPremiumWarning] = useState("");
  const [lifeOption, setLifeOption] = useState("single");

  useEffect (() => {
    const withdrawalRates = {
      55: 0.0415, 56: 0.0435, 57: 0.0455, 58: 0.0475, 59: 0.0495,
      60: 0.0515, 61: 0.0525, 62: 0.0535, 63: 0.0545, 64: 0.0555,
      65: 0.0565, 66: 0.0575, 67: 0.0585, 68: 0.0595, 69: 0.0605,
      70: 0.0615, 71: 0.0625, 72: 0.0635, 73: 0.0645, 74: 0.0655,
      75: 0.0665, 76: 0.0675, 77: 0.0685, 78: 0.0695, 79: 0.0705,
      80: 0.0715, 81: 0.0725, 82: 0.0735, 83: 0.0745, 84: 0.0755,
      85: 0.0765
    };
    const waitingYears = incomeAge - currentAge;
    const incomeBase = premium * 1.25 + (premium * 1.25 * 0.1 * Math.min(waitingYears, 10))
    const estimatedIncome = incomeBase * (lifeOption === "joint" 
                                            ? withdrawalRates[incomeAge] - 0.005
                                            : withdrawalRates[incomeAge]);
    setIncome(estimatedIncome.toFixed(2));
  }, [currentAge, incomeAge, premium, lifeOption]);

  const handlePremiumChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setPremium("")
      setPremiumWarning("")
      return
    }
    const premium = Number(value);
    if (premium < 25000 || premium > 1000000) {
      setPremiumWarning("Premium must be between $25,000 and $1,000,000");
    } else {
      setPremiumWarning("")
    }
    setPremium(premium);
  };

  const handleCurrentAgeChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCurrentAge("")
      setCurrentAgeWarning("")
      return
    }
    const age = Number(value);
    if (age < 44 || age > 80) {
      setCurrentAgeWarning("Current age must be between 45 and 80");
    } else {
      setCurrentAgeWarning("")
    }
    setCurrentAge(age);
  };

  const handleIncomeAgeChange = (e) => {
    const value = e.target.value;
    if (value === "") {
      setInomeAge("")
      setInomeAgeWarning("")
      return
    }
    const age = Number(value);
    if (age < currentAge || age < 55) {
      setInomeAgeWarning("Income start age must be equal to or greater than your current age and 55");
    } else {
      setInomeAgeWarning("")
    }
    setInomeAge(age);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 px-1 mt-1">
      <motion.div
        className="w-full max-w-md p-6 bg-white rounded-xl shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <img 
            src="/NEWGEN_Logo_Black.png" 
            alt="Newgen Logo" 
            className="w-70 h-32 object-contain"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4 px-1">
          Lifetime Income Calculator
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Current Age
            </label>
            <Input
              type="number"
              value={currentAge}
              min={40}
              max={80}
              onChange={handleCurrentAgeChange}
            />
          </div>
          {currentAgeWarning && <p className="text-red-500 text-sm mt-1">{currentAgeWarning}</p>}
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Age I would like to start receiving income
            </label>
            <Input
              type="number"
              value={incomeAge}
              onChange={handleIncomeAgeChange}
            />
            {incomeAgeWarning && <p className="text-red-500 text-sm mt-1">{incomeAgeWarning}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Premium Amount
            </label>
            <div className="space-y-1">
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <Input
                  type="number"
                  value={premium}
                  min={100000}
                  max={1000000}
                  step={100000}
                  className="pl-6"
                  onChange={handlePremiumChange}
                />
              </div>
            </div>
            {premiumWarning && <p className="text-red-500 text-sm mt-1">{premiumWarning}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-600">
              Lifetime Income Option
            </label>
            <RadioGroup
              defaultValue="single"
              value={lifeOption}
              onValueChange={setLifeOption}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="single" id="single" />
                <Label htmlFor="single">Single Life</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="joint" id="joint" />
                <Label htmlFor="joint">Joint Life</Label>
              </div>
            </RadioGroup>
          </div>
          {/* calculation output */}
          {income > 0 && (
            <Card className="mt-4">
              <CardContent className="p-4 text-center">
                <p className="text-lg text-gray-700">Initial Premium:</p>
                <motion.h3
                  className="text-lg font-bold text-green-700 mt-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(premium)}
                </motion.h3>
                <p className="text-lg text-gray-700">Estimated Yearly Income:</p>
                <motion.h3
                  className="text-3xl font-bold text-green-700 mt-2"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  ${new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(income)}
                </motion.h3>
                <p className="p-4 text-center">
                  Payout Ratio: <span className="font-bold text-green-700">{((income / premium) * 100).toFixed(2)}%</span> of Initial Premium
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </motion.div>
    </div>
  );
}
