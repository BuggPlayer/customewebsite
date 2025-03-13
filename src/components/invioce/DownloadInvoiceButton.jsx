"use client";
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const DownloadInvoiceButton = ({ order }) => {
  console.log("order" ,order)
  const invoiceRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);

  const generatePDF = async () => {
    const element = invoiceRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: '#000000'
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${order.id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button 
          onClick={() => setShowPreview(true)}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 text-sm font-medium rounded-lg bg-primary-DEFAULT text-textColor-secondary hover:bg-primary-dark transition-colors"
        >
          {/* Preview Icon */}
          Preview Invoice
        </button>

        <button 
          onClick={generatePDF}
          className="flex items-center justify-center gap-2 px-4 sm:px-6 py-3 text-sm font-medium rounded-lg border border-primary-DEFAULT text-textColor-primary hover:bg-primary-light/10 transition-colors"
        >
          {/* Download Icon */}
          Download PDF
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="bg-background-secondary rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 sm:p-6 border-b border-primary-DEFAULT">
              <h2 className="text-xl sm:text-2xl font-bold text-textColor-primary mb-2 sm:mb-0">Invoice Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-textColor-muted hover:text-textColor-primary"
              >
                {/* Close Icon */}
              </button>
            </div>
            
            {/* Invoice Template */}
            <div ref={invoiceRef} className="p-4 sm:p-8 bg-background-DEFAULT w-full sm:w-[210mm] min-h-[297mm]">
              {/* Header */}
              <div className="mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-primary-DEFAULT">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="text-left">
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-DEFAULT">Fragrance Haven</h2>
                    <p className="text-textColor-muted text-sm sm:text-base">123 Perfume Lane</p>
                    <p className="text-textColor-muted text-sm sm:text-base">Mumbai, MH 400001</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <h1 className="text-xl sm:text-3xl font-bold text-textColor-primary">INVOICE</h1>
                    <p className="text-textColor-muted text-sm sm:text-base mt-1 sm:mt-2">Order #: {order._id}</p>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="mb-6 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-primary-light/10 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-DEFAULT mb-1 sm:mb-2">Billing Details</h3>
                  <p className="text-textColor-secondary text-sm sm:text-base">{order?.billingAddress?.name}</p>
                  <p className="text-textColor-secondary text-sm sm:text-base">{order?.billingAddress?.address}</p>
                  <p className="text-textColor-secondary text-sm sm:text-base">{order?.billingAddress?.city}, {order?.billingAddress?.state}</p>
                  <p className="text-textColor-secondary text-sm sm:text-base">{order?.billingAddress?.postalCode}</p>
                </div>
                <div className="bg-primary-light/10 p-3 sm:p-4 rounded-lg">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-DEFAULT mb-1 sm:mb-2">Shipping Details</h3>
                  {/* Shipping details content */}
                </div>
              </div>

              {/* Items Table */}
              <div className="overflow-x-auto mb-6 sm:mb-8">
                <table className="w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-primary-DEFAULT text-textColor-secondary">
                      <th className="text-left py-3 px-3 sm:px-4 text-sm sm:text-base">Product</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-sm sm:text-base">Price</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-sm sm:text-base">Qty</th>
                      <th className="text-left py-3 px-3 sm:px-4 text-sm sm:text-base">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.products.map((item, index) => (
                      <tr key={index} className="border-b border-primary-DEFAULT/20 even:bg-background-secondary">
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-textColor-secondary text-sm sm:text-base">{item.name} ({item.size})</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-textColor-secondary text-sm sm:text-base">₹{item.price.toFixed(2)}</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-textColor-secondary text-sm sm:text-base">{item.quantity}</td>
                        <td className="py-2 sm:py-3 px-3 sm:px-4 text-textColor-secondary text-sm sm:text-base font-medium">₹{(item.price * item.quantity).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="w-full sm:float-right sm:w-80">
                <div className="bg-primary-light/10 p-4 sm:p-6 rounded-lg">
                  <div className="flex justify-between mb-2 sm:mb-3">
                    <span className="text-textColor-secondary text-sm sm:text-base">Subtotal:</span>
                    <span className="text-textColor-secondary text-sm sm:text-base">₹{order?.subtotal?.toFixed(2)}</span>
                  </div>
                  {/* Other total rows */}
                  <div className="flex justify-between pt-3 sm:pt-4 border-t border-primary-DEFAULT">
                    <span className="text-base sm:text-lg font-bold text-primary-DEFAULT">Total:</span>
                    <span className="text-base sm:text-lg font-bold text-primary-DEFAULT">₹{order?.total?.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-8 sm:mt-16 pt-4 sm:pt-8 border-t border-primary-DEFAULT/20 text-center text-sm text-textColor-muted">
                <p className="text-xs sm:text-sm">Thank you for your business!</p>
                <p className="mt-1 sm:mt-2 text-xs sm:text-sm">Noze perfum• contact@fragrancehaven.com • +91 98765 43210</p>
              </div>
            </div>

            {/* Modal Footer Buttons */}
            <div className="p-4 sm:p-6 border-t border-primary-DEFAULT/20 flex flex-col sm:flex-row justify-end gap-2 sm:gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-4 sm:px-6 py-2 text-textColor-primary hover:bg-background-secondary rounded-lg transition-colors text-sm sm:text-base"
              >
                Close
              </button>
              <button
                onClick={generatePDF}
                className="px-4 sm:px-6 py-2 bg-primary-DEFAULT text-textColor-secondary rounded-lg hover:bg-primary-dark transition-colors text-sm sm:text-base"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadInvoiceButton;