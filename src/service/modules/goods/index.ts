import service from '@/service'

// 定义查询商品分类的请求
export const selectGoodsCategories = (params?: object) => {
  return service.get({
    url: 'categories',
    params
  })
}

// 添加分类的请求
export const insertGoodsCategories = (data: object) => {
  return service.post({
    url: 'categories',
    data
  })
}

// 定义根据 id 查询商品分类的请求
export const selectGoodsCategoriesById = (id: number) => {
  return service.get({
    url: 'categories/' + id
  })
}

// 定义编辑提交分类的请求
export const updateGoodsCategories = (editCateForm: any) => {
  return service.put({
    url: 'categories/' + editCateForm.cat_id,
    data: {
      cat_name: editCateForm.cat_name
    }
  })
}

// 定义删除分类的请求
export const deleteGoodsCategories = (id: number) => {
  return service.delete({
    url: 'categories/' + id
  })
}

// 定义查询商品列表的请求
export const selectGoods = (params: object) => {
  return service.get({
    url: 'goods',
    params
  })
}

// 定义编辑提交商品的请求
// export const updateGood = () => {
//   return service.put({
//     url: 'goods' + id,
//     data: {
//       goods_name: '',
//       goods_price: '',
//       goods_number: '',
//       goods_weight: '',
//       goods_introduce
//     }
//   })
// }

// 定义删除商品的请求
export const deleteGood = (id: number) => {
  return service.delete({
    url: 'goods/' + id
  })
}

// 定义获取参数列表的请求
export const selectCategoriesArributes = (id: number, sel: string) => {
  return service.get({
    url: `categories/${id}/attributes`,
    params: {
      sel
    }
  })
}

// 定义添加动态参数或者静态属性的请求
export const insertCategoriesArributes = (id: number, attr_name: string, attr_sel: string) => {
  return service.post({
    url: `categories/${id}/attributes`,
    data: {
      attr_name,
      attr_sel
    }
  })
}

// 定义根据 id 查询参数的请求
export const selectCategoriesArributeById = (id: number, attr_id: number, attr_sel: string) => {
  return service.get({
    url: `categories/${id}/attributes/${attr_id}`,
    params: {
      attr_sel
    }
  })
}

// 定义编辑提交参数的请求
export const updateCategoriesArribute = (
  id: number,
  attr_id: number,
  attr_name: string,
  attr_sel: string,
  attr_vals?: string
) => {
  return service.put({
    url: `categories/${id}/attributes/${attr_id}`,
    method: 'put',
    data: {
      attr_name,
      attr_sel,
      attr_vals
    }
  })
}

// 定义删除参数的请求
export const deleteCategoriesArribute = (id: number, attr_id: number) => {
  return service.delete({
    url: `categories/${id}/attributes/${attr_id}`
  })
}

// 定义上传图片的请求
export const uploadPicture = (file: File) => {
  return service.post({
    url: 'upload',
    data: {
      file
    }
  })
}
