import { Request, Response, NextFunction } from 'express'

const getYear = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    const { year } = req.body
    const payload = { userId, year }
    next(payload)
  } catch (error: any) {
    let message = error.message || 'Something went wrong'
    return res.status(500).json({ message })
  }
}
