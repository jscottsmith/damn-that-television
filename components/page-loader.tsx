import { motion } from 'framer-motion';
import Eye from './eye';

export function PageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-pepto text-deep">
      <div>
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ scale: 0.5 }}
          animate={{ scale: [0.7, 0.5, 0.7] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <Eye className="w-20" />
        </motion.div>
        <p className="text-center font-medium">Loading, hang tight!</p>
      </div>
    </div>
  );
}
