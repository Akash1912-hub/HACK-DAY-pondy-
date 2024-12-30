import { motion } from 'framer-motion'

export default function ProgressSteps({ currentStep }) {
  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex items-center">
            <motion.div
              className={`rounded-full h-10 w-10 flex items-center justify-center ${
                currentStep >= step ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: step * 0.1 
              }}
            >
              {step}
            </motion.div>
            {step < 3 && (
              <motion.div
                className={`h-1 w-12 ${
                  currentStep > step ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: step * 0.2 }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}