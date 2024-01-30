SELECT up.id, up.userId, wp.id as 'wp id', wp.percentageFinished, wp.status as 'wpProgress status', bep.id as 'bep id', bep.blankExerciseId, bep.status as 'bepProgress status' FROM translations.user_progress as up
inner join translations.workbook_progress as wp on up.workbookProgressId = wp.id
inner join translations.blank_exercise_progress as bep on up.blankExerciseProgressId = bep.id
where up.userId = 1;

