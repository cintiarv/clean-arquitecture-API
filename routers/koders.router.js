//endpoints

import express from 'express'
import {Koder} from '../models/koders.model.js'



const router = express.Router()

   //Routers o endpoints 
   router.get('/', async(request, response) => {
    try{
        const {gender, age} = request.query

        const filters = {}

        if(gender){
            filters.gender = gender
        }
        if(age){
            filters.age = age
        }

            console.log(filters);

        const allKoders = await Koder.find(filters) //primero buscamos a todos 
        response.json({
            succes:true,
            data: {
                koders: allKoders
            }
        })
    }catch(error){
        response.status(400).json({ //400, error del cliente
            succes: false, 
            message: error.message
        }) 
   
    }
})

//POST /koders
router.post('/', async (request, response) => {
    try{
        const {body: newKoder} = request

        const koderCreated = await Koder.create(newKoder)
        console.log(koderCreated);
        response.json({
            succes:true,
            msg:'koder creado'
        })
    }catch(error){
        response.status(400).json({ //400, error del cliente
            succes: false, 
            message: error.message
        }) 
    }
      
})

//GET /koders /:id

router.get('/:id', async (request, response) => {
  try{  
    const {id} = request.params
    const koderFound = await Koder.findById(id)

    /* if(!koderFound){
        response.status(404).json({
            succes:false,
            message:'koder no encontrado'
    })
    return 
} */
    if(!koderFound){
        throw new StatusHttp('Koder no encontrado')
    }
    response.json({
        succes:true,
        data: {
            koder:koderFound
        }
    })
} catch (error){
    response.status(400).json({
        succes: false,
        message: error.message
    })
}

})


router.delete('/:id', async (request, response) => {
    try{  
      let {id} = request.params
      const koderDeleted = await Koder.findByIdAndDelete(id) 
        console.log(koderDeleted);
        if(!koderDeleted){
            throw new StatusHttp('Koder no encontrado')
        }
        response.json({
            succes:true,
            data: {
                koder:koderDeleted
            }
        })
  } catch (error){
      response.status(400).json({
          succes: false,
          message: error.message
      })
  }
  
  })

  router.patch('/:id', async (request, response) => {
    try{  
      let {id} = request.params
      const newData = {
        lastName: 'Ruiz Verdugo'
    }
    const koderUpdated = await Koder.findByIdAndUpdate(id, newData, {new: true})
    console.log(koderUpdated);

        if(!koderUpdated){
            throw new StatusHttp('Koder no encontrado')
        }
        response.json({
            succes:true,
            data: {
                koder:koderUpdated
            }
        })
  } catch (error){
      response.status(400).json({
          succes: false,
          message: error.message
      })
  }
  
  })



    export default router 

