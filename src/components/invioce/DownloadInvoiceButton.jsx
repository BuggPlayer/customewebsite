"use client";
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FiDownload, FiEye, FiX } from 'react-icons/fi';

const DownloadInvoiceButton = ({ order }) => {
  const invoiceRef = useRef(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    const element = invoiceRef.current;
    if (!element) {
      setIsGenerating(false);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: null,
        ignoreElements: (element) => element.classList.contains('no-print')
      });

      const imgData = canvas.toDataURL('image/png', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`Invoice_${order?._id?.slice(-5) || 'ORDER'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (!order) {
    return <div className="text-red-500">Error: No order data provided</div>;
  }

  return (
    <div className="invoice-container">
      {/* Hidden invoice template */}
      <div className="absolute left-[-9999px] top-[-9999px]">
        <div ref={invoiceRef} className="w-[210mm] min-h-[297mm] bg-white p-8 invoice-print">
          {/* Header */}
          <div className="mb-8 pb-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-800">Fragrance Haven</h2>
                <p className="text-gray-600 text-sm">123 Perfume Lane</p>
                <p className="text-gray-600 text-sm">Mumbai, MH 400001</p>
              </div>
              <div className="text-left md:text-right">
                <h1 className="text-3xl font-bold text-gray-900">INVOICE</h1>
                <p className="text-gray-600 text-sm mt-2">
                  Order #: {order?._id?.slice(-5) || 'N/A'}
                </p>
                <p className="text-gray-600 text-sm">
                  Date: {new Date(order?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Order Details */}
          <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Billing Details</h3>
              <p className="text-gray-700 text-sm">{order?.shippingInfo?.name}</p>
              <p className="text-gray-700 text-sm">{order?.shippingInfo?.address}</p>
              <p className="text-gray-700 text-sm">
                {order?.shippingInfo?.city}, {order?.shippingInfo?.state}
              </p>
              <p className="text-gray-700 text-sm">{order?.shippingInfo?.postalCode}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Shipping Details</h3>
              <p className="text-gray-700 text-sm">{order?.shippingInfo?.name}</p>
              <p className="text-gray-700 text-sm">{order?.shippingInfo?.address}</p>
              <p className="text-gray-700 text-sm">
                {order?.shippingInfo?.city}, {order?.shippingInfo?.state}
              </p>
              <p className="text-gray-700 text-sm">{order?.shippingInfo?.postalCode}</p>
              {order?.shippingInfo?.phone && (
                <p className="text-gray-700 text-sm mt-1">Phone: {order.shippingInfo.phone}</p>
              )}
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto mb-8">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th className="text-left py-3 px-4 text-sm">Product</th>
                  <th className="text-left py-3 px-4 text-sm">Price</th>
                  <th className="text-left py-3 px-4 text-sm">Qty</th>
                  <th className="text-left py-3 px-4 text-sm">Total</th>
                </tr>
              </thead>
              <tbody>
                {order?.products?.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200 even:bg-gray-50">
                    <td className="py-3 px-4 text-gray-700 text-sm">
                      {item?.name} {item?.size && `(${item.size})`}
                    </td>
                    <td className="py-3 px-4 text-gray-700 text-sm">₹{item?.price?.toFixed(2)}</td>
                    <td className="py-3 px-4 text-gray-700 text-sm">{item?.quantity}</td>
                    <td className="py-3 px-4 text-gray-700 text-sm font-medium">
                      ₹{(item?.price * item?.quantity)?.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="w-full md:float-right md:w-80">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between mb-3">
                <span className="text-gray-700 text-sm">Subtotal:</span>
                <span className="text-gray-700 text-sm">₹{order?.totalPrice?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-700 text-sm">Shipping:</span>
                <span className="text-gray-700 text-sm">
                  ₹{order?.shipping_fee ? order.shipping_fee.toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between mb-3">
                <span className="text-gray-700 text-sm">Tax:</span>
                <span className="text-gray-700 text-sm">
                  ₹{order?.tax ? order.tax.toFixed(2) : '0.00'}
                </span>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-300">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{order?.totalPrice?.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
            <p className="mt-2">Fragrance Haven • contact@fragrancehaven.com • +91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 no-print">
        <button
          onClick={() => setShowPreview(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          disabled={isGenerating}
        >
          <FiEye className="w-4 h-4" />
          Preview Invoice
        </button>

        <button
          onClick={generatePDF}
          className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          disabled={isGenerating}
        >
          <FiDownload className="w-4 h-4" />
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Invoice Preview</h2>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>
            
            {/* Invoice Preview Content */}
            <div className="p-4 sm:p-8 bg-white w-full">
              {/* Same content as the hidden invoice template */}
              <div className="w-[210mm] min-h-[297mm] bg-white p-8 mx-auto">
                {/* Copy of the invoice content from the hidden div */}
                {/* ... */}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex justify-end gap-4">
              <button
                onClick={() => setShowPreview(false)}
                className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Close
              </button>
              <button
                onClick={generatePDF}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                disabled={isGenerating}
              >
                {isGenerating ? 'Generating...' : 'Download PDF'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadInvoiceButton;