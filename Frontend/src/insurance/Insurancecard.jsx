import { motion } from 'framer-motion'

export default function InsuranceCard({ type, selected, onSelect }) {
  return (
    <motion.button
      onClick={() => onSelect(type.id)}
      className={`relative overflow-hidden rounded-xl p-6 ${
        selected ? 'ring-2 ring-indigo-500' : ''
      }`}
      whileHover={{ 
        scale: 1.05,
        rotateY: 10,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)"
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${type.color} opacity-10`} />
      <div className="relative flex flex-col items-center">
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <type.icon className="w-12 h-12 mb-4" />
        </motion.div>
        <span className="font-medium">{type.name}</span>
      </div>
    </motion.button>
  )
}