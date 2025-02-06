import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

function IUL() {
  const [premium, setPremium] = useState(100000)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">IUL Calculator</h1>
      
      <Card className="max-w-md mx-auto">
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Premium Amount
            </label>
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
                onChange={(e) => {
                  const numericValue = Number(e.target.value);
                  setPremium(numericValue);
                }}
              />
            </div>
            <div className="text-sm text-gray-500 pl-2">
              Formatted: ${premium.toLocaleString()}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default IUL 