import { motion } from 'framer-motion';
import cx from 'classnames';
import { useHasMounted } from 'hooks/use-has-mounted';
import Eye from './eye';

export function PageLoader() {
  const hasMounted = useHasMounted();
  return (
    <div
      className={cx(
        'fixed inset-0 flex items-center justify-center bg-pepto text-deep transition-opacity duration-500 ease-out',
        { 'opacity-0': !hasMounted },
      )}
    >
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
