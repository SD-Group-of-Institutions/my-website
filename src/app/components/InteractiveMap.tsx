import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

export function InteractiveMap() {
  // Google Maps location: Updated with user-provided link
  const googleMapsLink = "https://maps.app.goo.gl/7qDYiTJNuhtA5s3B8";
  
  // Generate embed URL - Jammu location
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3357.2895842895844!2d74.84!3d32.74!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391e84c16a6a5cdd%3A0x5c6c6c6c6c6c6c6c!2sShastri%20Nagar%2C%20Jammu!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin";
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.4 }}
      className="bg-white border-2 border-[#1E3A8A] overflow-hidden shadow-xl group"
    >
      <div className="bg-[#1E3A8A] p-4 sm:p-6">
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 flex items-center gap-2">
          <MapPin className="h-6 w-6" />
          Find Us on Map
        </h3>
        <p className="text-white/90 text-sm sm:text-base">
          Located in the heart of the city with easy access to public transportation.
        </p>
      </div>

      {/* Interactive Map Embed */}
      <div className="relative w-full h-[300px] sm:h-[350px] lg:h-[400px]">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Sd Group of Institutions Location"
          className="w-full h-full"
        />
        
        {/* Overlay with action buttons */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 sm:gap-3">
          <motion.a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-[#1E3A8A] text-white px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold hover:bg-[#1E40AF] transition-colors flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4" />
            Open in Google Maps
          </motion.a>
          
          <motion.a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#1E3A8A] px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold border-2 border-[#1E3A8A] hover:bg-[#F5F1E8] transition-colors flex items-center justify-center gap-2 shadow-lg"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Navigation className="h-3 w-3 sm:h-4 sm:w-4" />
            Directions
          </motion.a>
        </div>
      </div>

      {/* Additional Info */}
      <div className="p-4 sm:p-6 bg-[#F5F1E8] border-t-2 border-[#1E3A8A]">
        <div className="flex items-start gap-3">
          <MapPin className="h-5 w-5 text-[#1E3A8A] flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm sm:text-base font-semibold text-gray-900">
              107-C, Shastri Nagar, Opp Bank
            </p>
            <p className="text-xs sm:text-sm text-gray-600">
              Shastri Nagar, Jammu, Jammu and Kashmir 180004
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Easy access via public and private transport
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}