import { useEffect } from "react";
import { X, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData, type Product } from "../../types/product";
import { useAddProduct, useUpdateProduct } from "../../api/productApi";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productToEdit?: Product | null;
}

export default function AddProductModal({ isOpen, onClose, productToEdit }: AddProductModalProps) {
  const isEditMode = !!productToEdit;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category: "Electronics",
      price: 0,
      stock: 0,
      status: "In Stock",
    },
  });

  const addProductMutation = useAddProduct();
  const updateProductMutation = useUpdateProduct();

  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        reset({
          name: productToEdit.name,
          category: productToEdit.category,
          price: productToEdit.price,
          stock: productToEdit.stock,
          status: productToEdit.status,
        });
      } else {
        reset({
          name: "",
          category: "Electronics",
          price: 0,
          stock: 0,
          status: "In Stock",
        });
      }
    }
  }, [isOpen, productToEdit, reset]);

  const onSubmit = (data: ProductFormData) => {
    if (isEditMode && productToEdit) {
      updateProductMutation.mutate(
        { id: productToEdit.id, data }, 
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      addProductMutation.mutate(data, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const isLoading = addProductMutation.isPending || updateProductMutation.isPending;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 overflow-y-auto custom-scrollbar">
          <form id="product-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2">
                <Input 
                  label="Product Name" 
                  placeholder="e.g. MacBook Pro M3"
                  error={errors.name?.message}
                  {...register("name")} 
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                <select
                  {...register("category")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 dark:text-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                </select>
              </div>

              <Input 
                label="Price ($)" 
                type="number" 
                step="0.01"
                error={errors.price?.message}
                {...register("price", { valueAsNumber: true })} 
              />

              <Input 
                label="Stock Quantity" 
                type="number" 
                error={errors.stock?.message}
                {...register("stock", { valueAsNumber: true })} 
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  {...register("status")}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white dark:bg-gray-900 dark:text-white"
                >
                  <option value="In Stock">In Stock</option>
                  <option value="Low Stock">Low Stock</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>
            </div>

            {/* Image Upload Area */}
            <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer group">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full mb-3 group-hover:scale-110 transition-transform">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">Click to upload image</p>
            </div>

          </form>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} type="button">
            Cancel
          </Button>
          <Button 
            type="submit" 
            form="product-form" 
            isLoading={isLoading}
          >
            {isEditMode ? "Save Changes" : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}