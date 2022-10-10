//endpoints

import express from 'express'
import {Mentor} from '../models/mentors.model.js'



const router = express.Router()

   //Routers o endpoints 
   router.get('/', async(request, response) => {
    try{
        const {gender, age, module} = request.query

        const filters = {}

        if(gender){
            filters.gender = gender
        }
        if(age){
            filters.age = age
        }
        if(module){
            filters.module = module
        }

            console.log(filters);

        const allMentors = await Mentor.find(filters) //primero buscamos a todos 

    
        response.json({
            succes:true,
            data: {
                mentors: allMentors
            }
        })
    }catch(error){
        response.status(400).json({ //400, error del cliente
            succes: false, 
            message: error.message
        }) 
   
    }
})

//POST /mentors
router.post('/', async (request, response) => {
    try{
        const {body: newMentor} = request

        const mentorCreated = await Mentor.create(newMentor)
        console.log(mentorCreated);

    

        response.json({
            succes:true,
            msg:'mentor creado'
        })
    }catch(error){
        response.status(400).json({ //400, error del cliente
            succes: false, 
            message: error.message
        }) 
    }
      
})

//GET /mentors /:id

router.get('/:id', async (request, response) => {
  try{  
    const {id} = request.params
    const mentorFound = await Mentor.findById(id)

    if(!mentorFound){
        throw new StatusHttp('mentor no encontrado')
    }
    response.json({
        succes:true,
        data: {
            mentor:mentorFound
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
      const mentorDeleted = await Mentor.findByIdAndDelete(id) 
        console.log(mentorDeleted);
        if(!mentorDeleted){
            throw new StatusHttp('mentor no encontrado')
        }
        response.json({
            succes:true,
            data: {
                mentor:mentorDeleted
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
        gender: 'h'
    }
    const mentorUpdated = await Mentor.findByIdAndUpdate(id, newData, {new: true})
    console.log(mentorUpdated);

        if(!mentorUpdated){
            throw new StatusHttp('mentor no encontrado')
        }
        response.json({
            succes:true,
            data: {
                mentor:mentorUpdated
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

